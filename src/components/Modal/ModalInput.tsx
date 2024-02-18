import important from '../../icons/important.svg'

import { ModalError } from './ModalErrorItem'

interface ModalInputProps {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    size?: string
    error: string
}

export const ModalInput: React.FC<ModalInputProps> = ({ name, setName, size, error }) => {
    return (
        <div className={size === 'large' ? 'modalinput-wrapper large' : 'modalinput-wrapper'}>
            <input
                id="modalinput"
                className="modalinput"
                placeholder="Введите имя задачи/категории"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <img src={important} alt="important" className="modalinput-icon" />
            <label htmlFor="modalinput">Имя</label>
            {name === '' && <ModalError error={error} />}
        </div>
    )
}
