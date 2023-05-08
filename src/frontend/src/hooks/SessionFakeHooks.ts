// this is a placeholder for a 'real hook' providing the current user data (ID, name, role, etc.)
// ideally we would actually implement this and back it with a fully fledged auth + session system
// for now, I've mocked it with an ID and name from a real StudentContact I manually added on my machine
// this lets me fake myself as the below user for demo purposes
export default function useSession() {
    return {
        user: {
            id: 'f8b20b08-7a50-4afa-994b-1bd34a7c114c',
            name: 'Lucy Hawking',
            role: 'admin'
        }
    };
}
