import { ReactNode, useState } from 'react'
import { Children, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'phosphor-react'


export type IpropsModal = {
  title?: string
  children: React.ReactNode 
}

interface useModal  {
    closeModal: () => void,
    openModal: () => void,   
    Modal: ({ title, children }: IpropsModal) => JSX.Element 
}


export const useModal = () : useModal => {
    const [modal, setModal] = useState(false)   
    const closeModal = () =>    setModal(false)
    const openModal = () =>   setModal(true)


const Modal = ({title, children}: IpropsModal) => {
 
 return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => console.log()}>
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
                <Dialog.Panel className="w-auto h-auto transform overflow-hidden rounded-2xl bg-base-800 px-5 pb-5 transition-all ">
                  <button type="button"  onClick={closeModal} className="hover:bg-brand-500 transition-all rounded-full p-1 relative top-2 left-[95%]"><X/></button>
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

    return {Modal, openModal, closeModal}
}