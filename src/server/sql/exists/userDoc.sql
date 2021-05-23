SELECT EXISTS (
	SELECT
		*
	FROM
		{{ tableName }}
	WHERE
		user_id = {{ userId }} AND
		{{ columnName }} = {{ docId }}
);