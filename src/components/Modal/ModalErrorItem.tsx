interface ModalErrorProps {
    error: string
}

export const ModalError: React.FC<ModalErrorProps> = ({ error }) => {
    return <div className="error">{error}</div>
}
