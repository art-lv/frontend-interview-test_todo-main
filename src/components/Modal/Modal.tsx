/* VENDOR */
import React from 'react'

/* APPLICATION */
import './scss/Modal.scss'

interface ModalProps {
    item?: {
        id: string
        name: string
        description: string
        category?: string
    }
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
    clearState?(): void
}

export const Modal: React.FC<ModalProps> = ({ clearState, active, setActive, children }) => {
    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={() => {
                // Очистим стейт
                clearState && clearState()
                // Закроем окно
                setActive(false)
            }}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
