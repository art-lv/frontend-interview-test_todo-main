/* VENDOR */
import { useState } from 'react'

import { useAppDispatch } from '../../redux/app/hooks'

import { useLocation } from 'react-router-dom'

/* APPLICATION */
import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { ModalRow } from './ModalRow'
import { ModalInput } from './ModalInput'
import { ModalTextarea } from './ModalTextarea'
import { ModalFooter } from './ModalFooter'
import { tasksUpdated } from '../../redux/features/tasksSlice'
import { categoriesUpdated } from '../../redux/features/categoriesSlice'

interface ModalEditItemProps {
    item: {
        id: string
        name: string
        description: string
        category?: string
    }
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalEditItem: React.FC<ModalEditItemProps> = ({ item, active, setActive }) => {
    const dispatch = useAppDispatch(),
        { pathname } = useLocation(),
        isCategories = pathname.includes('categories'),
        [name, setName] = useState(item.name),
        [selected, setSelected] = useState(item.category || ''),
        [description, setDescription] = useState(item.description),
        [error, setError] = useState('')

    const submitForm = () => {
        // Задиспатчим изменения в стейт
        dispatch(
            isCategories
                ? categoriesUpdated({ id: item.id, name, description })
                : tasksUpdated({
                      id: item.id,
                      name,
                      description,
                      category: selected,
                  }),
        )
        setActive(false)
    }

    return (
        <Modal item={item} active={active} setActive={setActive}>
            <ModalHeader
                setActive={setActive}
                title={isCategories ? 'Редактирование категории' : 'Редактирование задачи'}
            />
            {isCategories ? (
                <ModalInput name={name} setName={setName} size="large" error={error} />
            ) : (
                <ModalRow
                    name={name}
                    setName={setName}
                    selected={selected}
                    setSelected={setSelected}
                    error={error}
                />
            )}
            <ModalTextarea description={description} setDescription={setDescription} />
            <ModalFooter
                setActive={setActive}
                submitBtnText="Сохранить"
                size="large"
                onSubmit={
                    name
                        ? () => {
                              submitForm()
                          }
                        : // Если обязательное поле name не введено - то подсветим ошибку
                          () => {
                              setError('Данное поле обязательно')
                          }
                }
            />
        </Modal>
    )
}
