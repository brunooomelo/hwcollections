import firebase from 'firebase'
export type Provider = 'google' | 'github'

export const getProvider = (provider: Provider) => ({
  github: new firebase.auth.GithubAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider()
} as Record<Provider, any>)[provider]
