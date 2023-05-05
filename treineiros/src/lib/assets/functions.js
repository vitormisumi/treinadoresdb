    export const shortDate = (date) => {
        return (
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear()
        );
    }

    export const age = (birthdate) => {
        const today = new Date();
        const age =
        today.getFullYear() -
        birthdate.getFullYear() -
        (today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() &&
            today.getDate() < birthdate.getDate()));
        return age;
    }