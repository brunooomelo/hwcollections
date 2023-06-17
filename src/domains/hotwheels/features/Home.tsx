import {
  ActionIcon,
  Flex,
  Modal,
} from "@mantine/core";
import { useState } from "react";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { CloudArrowUp } from "@phosphor-icons/react";
import { IItem, Wishlist } from "../@types";
import { useToasts } from "react-toast-notifications";
import { Header } from "../../../shared/components/Header";
import { Item } from "../components/Item";
import { Button } from "../../../shared/components/Button";
import { supabase } from "../../../shared/lib/supabase";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HotWheelForm } from "../components/forms/HotWheelForm";

export function Home() {
  const { session } = useAuth()
  const { addToast } = useToasts();
  const [id, setId] = useState<string | null>(null)
  const [addHotWheelsModalOpened, addHotWheelsModal] = useDisclosure();
  const [importModalOpened, importModal] = useDisclosure();

  const [localStorageValue, setLocalStorage] = useLocalStorage<Wishlist[]>({
    key: "hotwheels",
    defaultValue: [],
  });

  const { data, refetch } = useQuery({
    queryFn: async () => {
      const { data } = await supabase.from('items').select('*').neq('is_active', false).order('is_done', { ascending: true }).returns<IItem[]>().throwOnError()
      return data
    },
    queryKey: ['hotwheels']
  })

  const editable = data?.find(d => d.id === id)?.name
  const editableData = () => {
    if (editable) {
      const [lote, name] = editable.split(']').map(chunk => chunk.trim().replace('[', ''))
      return {
        lote, name
      }
    }
    return undefined
  }


  const addHotWheel = useMutation({
    mutationFn: async (data: Omit<IItem, 'id'>) => {
      await supabase.from('items').insert(data).throwOnError()
    },
    onSuccess: () => {
      addToast('Saved Successfully', { appearance: 'success' });
      addHotWheelsModal.close()
    }
  })

  const editHotWheel = useMutation({
    mutationFn: async (data: Partial<IItem>) => {
      const { id, ...updateData } = data
      await supabase.from('items').update(updateData).
        eq('id', id).throwOnError()
    },
    onSuccess: () => {
      setId(null)
      addToast('Edited Successfully', { appearance: 'success' });
      addHotWheelsModal.close()
    }
  })

  const changeDoneById = useMutation({
    mutationFn: async ({ id, isDone }: { id: string; isDone: boolean }) => {
      await supabase.from('items').update<Partial<IItem>>({
        is_done: isDone
      }).
        eq('id', id).throwOnError()
    },
    onSuccess: () => {
      refetch()
    }
  })

  const deleteHotWheel = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('items').update<Partial<IItem>>({
        is_active: false
      }).
        eq('id', id).throwOnError()
    },
    onSuccess: () => {
      addToast('Deleted Successfully', { appearance: 'success' });
    }
  })
  const importHotWheels = useMutation({
    mutationFn: async (hws: Wishlist[]) => {
      await supabase.from('items').insert<Omit<IItem, 'id'>[]>(
        hws.map((hw) => ({
          description: '',
          is_active: true,
          is_done: hw.checked,
          name: hw.name,
          owner: session!.user.id
        })
        )
      ).throwOnError()
    },
    onSuccess: () => {
      setLocalStorage([])
      addToast('Imported Successfully', { appearance: 'success' });
      importModal.close();
    }
  })


  const importHandleSubmit = async () => importHotWheels.mutateAsync(localStorageValue)

  const changeCheckedById = async (id: string, checked: boolean) => {
    await changeDoneById.mutateAsync({
      id,
      isDone: checked
    })
  };

  const hwIsDone = data?.filter((hw) => !hw.is_done);

  const onEdit = (id: string) => {
    setId(id)
    addHotWheelsModal.open()
  }

  return (
    <div className="flex flex-col p-8 gap-8">
      <Header />
      <fieldset>
        <div className="flex flex-col xs:flex-row items-center justify-between">
          <legend className="text-base font-semibold leading-6 text-gray-900 flex gap-3">
            <span>
              Collection
            </span>
            {!!data?.length && !!hwIsDone && (
              <strong>
                {data.length - hwIsDone.length}/{data.length}
              </strong>
            )}
          </legend>

          <div className="flex items-center gap-2 w-full justify-end">
            {!!localStorageValue.length && (
              <ActionIcon onClick={importModal.open}>
                <CloudArrowUp size={24} />
              </ActionIcon>
            )}
            <Button
              onClick={addHotWheelsModal.open}
              className="max-w-[100px]"
            >
              New Item
            </Button>

          </div>
        </div>

        <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
          {data?.map((hw) => (
            <Item
              id={hw.id}
              checked={hw.is_done}
              name={hw.name}
              key={hw.id}
              onEdit={() => onEdit(hw.id)}
              onCheckHandler={(isChecked) =>
                changeCheckedById(hw.id, isChecked)
              }
              onDelete={() => {
                deleteHotWheel.mutateAsync(hw.id)
              }}
            />
          ))}
        </div>
      </fieldset >
      <Modal
        opened={addHotWheelsModalOpened}
        onClose={addHotWheelsModal.close}
        title="Add your hot wheels!"
      >
        <HotWheelForm
          onSubmit={async ({ lote, name }) => {
            if (editable && id) {
              await editHotWheel.mutateAsync({
                id,
                name: `${!!lote ? `[${lote.toUpperCase()}]` : ''} ${name.toUpperCase()}`,
              })
            } else {
              await addHotWheel.mutateAsync({
                name: `${!!lote ? `[${lote.toUpperCase()}]` : ''} ${name.toUpperCase()}`,
                description: '',
                is_active: true,
                is_done: false,
                owner: session!.user.id
              })
            }

          }}
          isEditable={!!editable}
          defaultValues={editableData()}
        />
      </Modal>

      <Modal
        opened={importModalOpened}
        onClose={importModal.close}
        title="Import your HotWheels in localstore to cloud!"
      >
        <Flex gap="sm" direction="column">
          <Button onClick={importHandleSubmit}>Import to cloud</Button>
        </Flex>
      </Modal>
    </div>
  );
}
