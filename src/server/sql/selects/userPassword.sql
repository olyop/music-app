SELECT
	user_id,
	password
FROM
	users
WHERE
	user_id = {{ userId }};