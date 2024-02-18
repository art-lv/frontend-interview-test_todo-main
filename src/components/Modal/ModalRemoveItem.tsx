/* VENDOR */
import { useAppDispatch } from '../../redux/app/hooks'
import { useLocation } from 'react-router-dom'

/* APPLICATION */
import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { ModalText } from './ModalText'
import { ModalFooter } from './ModalFooter'
import { tasksRemoved, tasksClearedCategories } from '../../redux/features/tasksSlice'
import { categoriesRemoved } from '../../redux/features/categoriesSlice'

interface ModalRemoveItemProps {
    item: {
        id: string
        name: string
        description: string
        category?: string
    }
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalRemoveItem: React.FC<ModalRemoveItemProps> = ({ item, active, setActive }) => {
    const dispatch = useAppDispatch(),
        { pathname } = useLocation(),
        isCategories = pathname.includes('categories'),
        text = `Вы уверены, что хотите удалить задачу "${item.name}"?`

    const submitForm = () => {
        dispatch(categoriesRemoved(item.id))
        dispatch(tasksClearedCategories(item.id))
    }

    return (
        <Modal item={item} active={active} setActive={setActive}>
            <ModalHeader setActive={setActive} title={'Удаление задачи'} />
            <ModalText text={text} />
            <ModalFooter
                setActive={setActive}
                submitBtnText="Да"
                onSubmit={
                    isCategories
                        ? () => {
                              submitForm()
                          }
                        : () => dispatch(tasksRemoved(item.id))
                }
            />
        </Modal>
    )
}
