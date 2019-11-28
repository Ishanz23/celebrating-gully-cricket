import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore'

export interface Player {
  id?: string
  firstName: string
  lastName: string
  nickName?: string
  battingOrientation: string
  bowlingOrientation: string
  specialization: string
  address: string
  mobile: string
  yearOfBirth?: number
  career: Career
  votes?: any[]
  tournaments?: firebase.firestore.DocumentReference[]
}

export interface Career {
  ballsBowled: number
  ballsFaced: number
  battingAverage: number
  bestBowlingFigures: { runs: number; wickets: number }
  catches: number
  economy: number
  highestScore: number
  innings: number
  matches: number
  notOuts: number
  runs: number
  runsConceded: number
  strikeRate: number
  stumpings: number
  wickets: number
}
