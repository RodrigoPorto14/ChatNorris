INSERT INTO tb_user (nickname, username, password, active, token) VALUES ('Rodrigo Porto', 'rodrigo@gmail.com',  '$2a$10$.zOGVUGsCsvuU3LKACLQ0OqKHUiPWFm/Z35PqBrykWGT1G9bPkbSK', true, 'token1');
INSERT INTO tb_user (nickname, username, password, active, token) VALUES ('Reinaldo Coutinho', 'reinaldo@gmail.com', '$2a$10$.zOGVUGsCsvuU3LKACLQ0OqKHUiPWFm/Z35PqBrykWGT1G9bPkbSK', true, 'token2');

INSERT INTO tb_chat (title, user_id) VALUES ('Title 1', 1)
INSERT INTO tb_chat (title, user_id) VALUES ('Title 2', 1)
INSERT INTO tb_chat (title, user_id) VALUES ('Title 3', 2)

INSERT INTO tb_message (text, is_user, created_at, chat_id) VALUES ('Text 1', 1, TIMESTAMP WITH TIME ZONE '2023-05-10T16:00:00Z', 1)
INSERT INTO tb_message (text, is_user, created_at, chat_id) VALUES ('Text 2', 0, TIMESTAMP WITH TIME ZONE '2023-05-10T16:00:10Z', 1)
INSERT INTO tb_message (text, is_user, created_at, chat_id) VALUES ('Text 3', 1, TIMESTAMP WITH TIME ZONE '2023-05-10T16:00:20Z', 1)
INSERT INTO tb_message (text, is_user, created_at, chat_id) VALUES ('Text 4', 0, TIMESTAMP WITH TIME ZONE '2023-05-10T16:00:30Z', 1)

INSERT INTO tb_message (text, is_user, created_at, chat_id) VALUES ('Text 1', 1, TIMESTAMP WITH TIME ZONE '2023-05-12T16:00:00Z', 2)
INSERT INTO tb_message (text, is_user, created_at, chat_id) VALUES ('Text 2', 0, TIMESTAMP WITH TIME ZONE '2023-05-12T16:00:10Z', 2)

INSERT INTO tb_message (text, is_user, created_at, chat_id) VALUES ('Text 1', 1, TIMESTAMP WITH TIME ZONE '2023-05-12T16:00:00Z', 3)
INSERT INTO tb_message (text, is_user, created_at, chat_id) VALUES ('Text 2', 0, TIMESTAMP WITH TIME ZONE '2023-05-12T16:00:10Z', 3)