import {  Dispatch, SetStateAction, useState } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'phosphor-react'


export type IpropsModal = {
  title?: string
  children: React.ReactNode 
  onCloseModal: () => void
}

interface useModal  {
    closeModal: () => void,
    openModal: () => void,   
    Modal: ({ title, children }: IpropsModal) => JSX.Element ,
    setModal: Dispatch<SetStateAction<boolean>>
}


export const useModal = (initialState: boolean = false) : useModal => {
    const [modal, setModal] = useState(initialState)   
    const closeModal = () =>    setModal(false)
    const openModal = () =>   setModal(true)
   


const Modal = ({title, children, onCloseModal}: IpropsModal) => {
 
 return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-auto h-auto transform overflow-hidden rounded-lg bg-brand-secondary dark:bg-dark-500  border-base px-5 pb-5 transition-all ">
                  <button type="button"  onClick={onCloseModal} className="btn transition-all rounded-full p-1 relative top-2 left-[95%]"><X color="#FFFFFF" /></button>
                  {title && <Dialog.Title
                    as="h3"
                    className="font-semibold text-center text-3xl"                   
                  >
                    {title}
                  </Dialog.Title>}
                {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
  
}

    return {Modal, openModal, closeModal, setModal}
}