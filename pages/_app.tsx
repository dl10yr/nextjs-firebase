import '../styles/globals.css'
import { useEffect } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { currentUserState } from '../lib/atoms/currentUser'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../lib/firebase/firebaseClient'

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState)
  const fetchSetUser = async () => {
    try {
      onAuthStateChanged(firebaseAuth, async (user) => {
        if (!user) {
          signInAnonymously(firebaseAuth)
            .then(async (e) => {
              if (e.user) {
                setCurrentUser({
                  uid: e.user.uid,
                  displayName: e.user.displayName,
                  isAnonymus: e.user.isAnonymous,
                })
              }
              // eslint-disable-next-line no-console
            })
            .catch(() => {
              // console.log(error)
            })
        } else {
          setCurrentUser({
            uid: user.uid,
            displayName: user.displayName,
            isAnonymus: user.isAnonymous,
          })
        }
      })
    } catch {
      setCurrentUser(null)
    }
  }
  useEffect(() => {
    fetchSetUser()
  }, [])
  return null
}

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AppInit />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
