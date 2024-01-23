import { useState, useEffect } from 'react'
import personService from './services/people'
import './index.css'


const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPeople(response.data)
      })
  }, [])
  console.log('render', people.length, 'people')




  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const nameObject = {
      name: newName,
      number: newNumber
    }
    console.log(people.some(e => e.name === nameObject.name))
    if(nameObject.name.length < 3){setErrorMessage(
      `Person validation failed: name: '${nameObject.name}' is shorter than the minimum allowed length (3). `)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }else if(nameObject.number.length < 8){setErrorMessage(
      `Person validation failed: number: '${nameObject.number}' is shorter than the minimum allowed length (8). `)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)}
    else if(people.some(e => e.name === nameObject.name && newNumber !== ""))
    {
      if(window.confirm(nameObject.name + " is already added to phonebook, replace old number with a new one ?")){
      let muokattavanId = people.find((people) => {return people.name === nameObject.name})
      console.log(muokattavanId.id, "  muokattavan id")
      
      personService
      .update(muokattavanId.id, nameObject)
      .then(response => {
        console.log(people.map(person => person.id !== muokattavanId.id ? person : response.data))
      setPeople(people.map(person => person.id !== muokattavanId.id ? person : response.data))
      setNotificationMessage(
        `Number for '${nameObject.name}' has been updated.`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `information of '${nameObject.name}' has already been deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)},
        setPeople(people.filter(n => n.id !== muokattavanId.id))
      )}
    }else if(people.some(e => e.name === nameObject.name)){
      alert(`${newName} is already added to phonebook`)
    }else{
      personService
      .create(nameObject)
      .then(response => {
        console.log(response.data)
        setPeople(people.concat(response.data))
        setNotificationMessage(
          `Added '${nameObject.name}'.`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

      })
      .catch(error => {console.log(error.response.data)})
      
     
      console.log(people)
    }
    
      
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleClick = (Delete) =>{
    if(window.confirm("Delete " + Delete.name + " ?")){
    personService
      .remove(Delete.id)
      .then(setPeople(people.filter((people) => {return people.id !==Delete.id;})))
      setNotificationMessage(
        `'${Delete.name}' has been deleted from phonebook.`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }else{console.log("poistaminen peruttiin")} 
  }

  const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
  }
  const Error = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  } 

  



  return (
    <div>
      <h2>Phonebook</h2>   
      
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <p>filter shown with: <input value={newFilter} onChange={handleFilterChange}/></p>

      <h2>add a new</h2>
      <form onSubmit={addName}>
        <p>name: <input value={newName} onChange={handleNameChange}/></p>
        <p>number: <input value={newNumber} onChange={handleNumberChange}/></p>
        <button type="submit">add</button>
      </form>     
      <h2>Numbers</h2>
      {people.filter(person => person.name.toUpperCase().match(newFilter.toUpperCase())).map(filteredPerson => (
      <ul>

          <p>
            {filteredPerson.name} {filteredPerson.number} &nbsp; &nbsp;
            <button onClick={() => handleClick(filteredPerson)}>  Delete </button>
          </p>
        
      </ul>
      ))}
    </div>
  )

}

export default App
