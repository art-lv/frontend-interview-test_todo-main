/* VENDOR */
import { useState } from 'react'
import { useAppDispatch } from '../../redux/app/hooks'
import { useLocation } from 'react-router-dom'

/* APPLICATION */
import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { ModalInput } from './ModalInput'
import { ModalRow } from './ModalRow'
import { ModalTextarea } from './ModalTextarea'
import { ModalFooter } from './ModalFooter'
import { tasksAdded } from '../../redux/features/tasksSlice'
import { categoriesAdded } from '../../redux/features/categoriesSlice'

interface ModalCreateItemProps {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCreateItem: React.FC<ModalCreateItemProps> = ({ active, setActive }) => {
    const dispatch = useAppDispatch(),
        { pathname } = useLocation(),
        isCategories = pathname.includes('categories'),
        [name, setName] = useState(''),
        [selected, setSelected] = useState(''),
        [description, setDescription] = useState(''),
        [error, setErrow] = useState('')

    function clearState() {
        setName('')
        setDescription('')
        setSelected('')
        setErrow('')
    }

    // Вынесем функцию создания
    const submitForm = () => {
        // Задиспатчим изменения в стейт
        dispatch(
            isCategories
                ? // Добавим новую категорию
                  categoriesAdded({ name, description })
                : // Добавим новую таску
                  // tasksAdded({ name, description, category: setSelected }),
                  tasksAdded({ name, description, category: selected }),
        )

        // Очистим локальный стейт
        clearState()

        // Закроем модалку
        setActive(false)
    }

    return (
        <Modal active={active} setActive={setActive} clearState={clearState}>
            <ModalHeader
                clearState={clearState}
                setActive={setActive}
                title={isCategories ? 'Создание категории' : 'Создание задачи'}
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
                clearState={clearState}
                submitBtnText="Создать"
                size="large"
                onSubmit={
                    name
                        ? () => {
                              submitForm()
                          }
                        : // Если обязательное поле name не введено - то подсветим ошибку
                          () => {
                              setErrow('Данное поле обязательно для заполнения')
                          }
                }
            />
        </Modal>
    )
}
