SELECT EXISTS (
	SELECT
		*
	FROM
		songs
	WHERE
		album_id = {{ albumId }} AND
		disc_number = {{ discNumber }} AND
		track_number = {{ trackNumber }}
);