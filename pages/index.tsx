import styles from '../styles/Home.module.css'
import { useCurrentUser } from '../lib/hooks/useCurrentUser'
import { firebaseAuth, googleProvider } from '../lib/firebase/firebaseClient'
import { linkWithPopup } from 'firebase/auth'
import { currentUserState } from '../lib/atoms/currentUser'
import { useSetRecoilState } from 'recoil'

export default function Home() {
  const { currentUser } = useCurrentUser()
  const setCurrentUser = useSetRecoilState(currentUserState)

  const loginWithGoogle = () => {
    linkWithPopup(firebaseAuth.currentUser, googleProvider)
      .then((result) => {
        const user = result.user
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName,
          isAnonymus: user.isAnonymous,
        })
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        // Handle Errors here.
      })
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button className="bg-gray-100 p-5" onClick={() => loginWithGoogle()}>
          Googleログイン
        </button>
        <div className="w-full break-all">{JSON.stringify(currentUser)}</div>
      </main>
    </div>
  )
}
