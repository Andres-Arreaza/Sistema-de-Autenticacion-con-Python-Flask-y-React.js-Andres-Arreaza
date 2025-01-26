const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: {},
            auth: false
        },
        actions: {
            getLogin: async (email, password) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    });
                    if (resp.status == 401) {
                        return false;
                    }
                    const data = await resp.json();
                    localStorage.setItem("token", data.token);
                    setStore({ user: data.user, auth: true });
                    return true;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                    return false;
                }
            },
            log_out: () => {
                localStorage.removeItem("token");
                setStore({ auth: false });
            },
            sign_up: async (email, password) => {
                try {
                    await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    });
                    return true;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
        }
    };
};
export default getState;
