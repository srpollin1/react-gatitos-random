import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMG_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
// const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
        const firstWord = fact.split(' ', 3).join(' ')
        console.log(firstWord)

        fetch(`https://cataas.com/cat/says/${firstWord}?size=5&color=red&json=true`)
          .then(res => res.json())
          .then(response => {
            const { url } = response
            // console.log(response)
            setImageUrl(`https://cataas.com${url}`)
          })
      })
  }, [])

  return (
    <main>
      <h1>App de gatitos</h1>
      <p> {fact} </p>
      {imageUrl && <img src={imageUrl} alt={`image extracted using the first rhee words for {${fact}} `} />}
    </main>
  )
}
