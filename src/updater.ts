export const update = (username: string, password: string, server: string) => {
    if(!username || !password || !server) {
        console.error("You must pass username, password and server")
        return
    }
}