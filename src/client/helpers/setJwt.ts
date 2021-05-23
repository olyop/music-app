export const setJwt =
	(jwt: string) =>
		localStorage.setItem("authorization", jwt)