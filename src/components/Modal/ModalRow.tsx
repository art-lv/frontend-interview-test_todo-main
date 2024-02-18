import { ModalInput } from './ModalInput'
import { ModalDropdown } from './ModalDropdown'

interface ModalRowProps {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    selected: string | undefined
    setSelected: React.Dispatch<React.SetStateAction<string>>
    error: string
}

export const ModalRow: React.FC<ModalRowProps> = ({
    name,
    setName,
    selected,
    setSelected,
    error,
}) => {
    return (
        <div className="modal__content_row">
            <ModalInput name={name} setName={setName} error={error} />
            <ModalDropdown selected={selected} setSelected={setSelected} />
        </div>
    )
}
