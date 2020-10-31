SELECT
	{{ columnNames }}
FROM
	keys
WHERE
	key_id = {{ keyId }};