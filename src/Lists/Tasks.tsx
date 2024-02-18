/* VENDOR */
import { useAppSelector } from '../redux/app/hooks'

/* APPLICATION */
import { ListItem } from './ListItem'
import { selectAllTasks } from '../redux/features/tasksSlice'

export const Tasks: React.FC = () => {
    const tasks = useAppSelector(selectAllTasks)

    return (
        <ul>
            {tasks.map((task) => (
                <ListItem key={task.id} item={task} />
            ))}
        </ul>
    )
}

// можно попробовать вынести svg в отдельный файл в виде кода
