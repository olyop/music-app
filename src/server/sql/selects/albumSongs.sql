SELECT
	{{ columnNames }}
FROM
	songs
WHERE
	album_id = {{ albumId }}
ORDER BY
	disc_number ASC,
	track_number ASC;