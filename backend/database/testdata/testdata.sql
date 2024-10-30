DELETE FROM time_tracking;
DELETE FROM kantask;
DELETE FROM task_tracking;
DELETE FROM board;


insert into board (board_id, group_id, name) values (1, 2, 'Operative');
insert into board (board_id, group_id, name) values (2, 9, 'hub');
insert into board (board_id, group_id, name) values (3,7, 'pricing structure');
insert into board (board_id, group_id, name) values (4,10, 'User-friendly');
insert into board (board_id, group_id, name) values (5,7, 'intranet');
insert into board (board_id, group_id, name) values (6,4, 'Innovative');
insert into board (board_id, group_id, name) values (7,6, 'support');
insert into board (board_id, group_id, name) values (8,8, 'Pre-emptive');
insert into board (board_id, group_id, name) values (9,2, 'Programmable');
insert into board (board_id, group_id, name) values (10,4, 'Mandatory');

insert into kantask (kantask_id, board_id, name, done_time, description) values (1, 7, 'feugiat', null, 'quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus');
insert into kantask (kantask_id, board_id, name, done_time, description) values (2, 5, 'id', null, 'blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus');
insert into kantask (kantask_id, board_id, name, done_time, description) values (3, 7, 'nulla', '2025-03-16T23:44:37Z', 'consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer');
insert into kantask (kantask_id, board_id, name, done_time, description) values (4, 1, 'amet', '2024-01-29T20:36:25Z', 'quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper');
insert into kantask (kantask_id, board_id, name, done_time, description) values (5, 7, 'convallis', '2025-03-21T02:54:34Z', 'elementum in hac habitasse platea dictumst morbi');
insert into kantask (kantask_id, board_id, name, done_time, description) values (6, 5, 'vel', '2024-10-01T22:16:08Z', 'eleifend donec ut dolor morbi');
insert into kantask (kantask_id, board_id, name, done_time, description) values (7, 5, 'leo', '2024-07-04T14:42:35Z', 'curabitur gravida nisi at nibh');
insert into kantask (kantask_id, board_id, name, done_time, description) values (8, 2, 'a', '2025-01-15T16:25:38Z', null);
insert into kantask (kantask_id, board_id, name, done_time, description) values (9, 8, 'justo', '2025-08-30T22:32:45Z', 'augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi');
insert into kantask (kantask_id, board_id, name, done_time, description) values (10, 4, 'penatibus', '2024-08-10T18:05:19Z', 'lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a');

insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (1, 6, 16, '2024-07-16T23:08:10Z', null, 'Dynava', null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (2, 8, 16, '2022-02-23T02:09:54Z', 3208, 'Voolith', null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (3, 2, 19, '2024-05-09T16:45:05Z', 5788, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (4, 6, 4, '2022-12-18T14:18:50Z', null, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (5, 9, 4, '2023-10-07T01:34:12Z', null, null, 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.');
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (6, 4, 14, '2024-06-10T01:35:18Z', 16252, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (7, 3, 3, '2024-07-24T06:55:38Z', null, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (8, 5, 19, '2022-02-26T09:00:14Z', 20272, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (9, 3, 1, '2022-06-11T12:10:26Z', 28156, 'Jabbercube', null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (10, 4, 2, '2024-07-05T22:15:00Z', 24491, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (11, 4, 14, '2023-04-15T19:22:43Z', null, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (12, 3, 10, '2023-04-22T17:32:38Z', null, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (13, 9, 16, '2023-02-05T06:56:16Z', null, null, 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (14, 9, 7, '2024-06-22T21:10:55Z', 20959, null, 'Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.');
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (15, 2, 7, '2024-09-12T10:10:57Z', 8001, 'Jazzy', null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (16, 2, 1, '2022-07-01T23:17:19Z', 28050, null, 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.');
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (17, 4, 5, '2022-03-11T01:33:18Z', 16905, 'Skivee', null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (18, 7, 16, '2024-03-25T17:02:31Z', null, null, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.');
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (19, 5, 13, '2022-01-31T22:30:34Z', null, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (20, 10, 14, '2023-11-13T22:09:43Z', 14302, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (21, 8, 19, '2022-03-28T15:43:43Z', 3324, 'Ozu', null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (22, 2, 1, '2022-04-12T20:50:00Z', null, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (23, 6, 2, '2023-05-29T02:33:11Z', 18266, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (24, 8, 3, '2022-05-18T05:38:21Z', null, 'Buzzster', null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (25, 7, 5, '2022-04-19T19:59:00Z', null, 'Demimbu', null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (26, 9, 17, '2023-01-04T22:01:59Z', 6711, 'Kwilith', 'Donec ut mauris eget massa tempor convallis.');
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (27, 10, 10, '2023-05-20T15:23:03Z', 28448, 'Yata', null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (28, 1, 14, '2022-09-14T08:11:53Z', 8987, null, null);
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (29, 6, 7, '2023-04-04T04:45:23Z', 5766, 'Eadel', 'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.');
insert into time_tracking (time_tracking_id, group_id, user_id, activity_start, activity_duration, title, description) values (30, 5, 2, '2024-03-08T15:01:27Z', 23889, null, null);

INSERT INTO task_tracking (time_tracking_id, kantask_id) (
	SELECT tt.time_tracking_id, kt.kantask_id
	FROM board b
	JOIN kantask kt USING(board_id)
	JOIN time_tracking tt USING(group_id)
)