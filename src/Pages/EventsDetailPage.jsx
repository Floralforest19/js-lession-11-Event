import React, { useEffect } from 'react'

const ROOT_URL = "http://yoshi.willandskill.eu:8999/api/v1/"

export default function EventDetailPage( props ) {
const {token} = useContext(UserContext)
const [mainPageData, setMainPageData] = useState(null)
    
useEffect(() => {
    fetchEventMainPage()
},[])

function fetchEventMainPage(){
    const currentSlug = props.match.params.slug
    const eventMainPageUrl = `${ROOT_URL}cms/${currentSlug}/main-page/`
    fetch(eventMainPageUrl, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}` 
        }
    })
    .then(res => res.json())
    .then(data => {
        setMainPageData(data)
    })
}

    return (
        <div>
            {mainPageData && (
                <div>
            <h1>{mainPageData.title}</h1>
            <p>{mainPageData.description}</p>
            {mainPageData.actionPoints && mainPageData.actionpoints.map((actionPoint, index ) => {
        return(
            <div key={actionPoint.id}>
                <p>{actionPoint.title}</p>
            </div>
            )
        })}
        </div>
    )}
    </div>
    )
}
