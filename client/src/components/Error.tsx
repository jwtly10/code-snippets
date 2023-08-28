function Error({
    error,
    handleError,
}: {
    error: string
    handleError: (err: string) => void
}) {
    return (
        <>
            {error ? (
                <p className="alert alert-danger mt-3 d-flex justify-content-between">
                    {error}
                    <span
                        onClick={() => handleError('')}
                        className="btn-close"
                    ></span>
                </p>
            ) : null}
        </>
    )
}

export default Error
