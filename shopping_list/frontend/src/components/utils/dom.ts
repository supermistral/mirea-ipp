export const getNameAndValue = (target: HTMLInputElement) => {
    const value = target.type === "checkbox" ? target.checked
        : target.type === "datetime-local" ? new Date(target.value)
        : target.value;
    const name = target.name;

    return { name, value };
}