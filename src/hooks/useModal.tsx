import { useState } from 'react'

type useModal = {
    modal: boolean,
    closeModal: () => void,
    openModal: () => void,  
}


export const useModal = () : useModal => {
    const [modal, setModal] = useState(false)   
    const closeModal = () =>    setModal(false)
    const openModal = () =>   setModal(true)

    return {modal , closeModal, openModal}
}