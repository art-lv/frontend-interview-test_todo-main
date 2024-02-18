/* VENDOR */
import { useAppSelector } from '../redux/app/hooks'

/* APPLICATION */
import { ListItem } from './ListItem'
import { selectAllCategories } from '../redux/features/categoriesSlice'

export const Categories = () => {
    const categories = useAppSelector(selectAllCategories)

    return (
        <ul>
            {categories.map((category) => (
                <ListItem key={category.id} item={category} />
            ))}
        </ul>
    )
}
