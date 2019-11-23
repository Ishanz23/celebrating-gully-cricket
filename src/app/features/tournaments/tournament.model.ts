import { AngularFirestoreDocument } from '@angular/fire/firestore'
import { Player } from '../players/player'

export interface Tournamnent {
  id?: string
  name: string
  season: string
  address?: string
  city?: string
  players: {
    count: number
    isNominated: boolean
    player: firebase.firestore.DocumentReference
  }[]
}
