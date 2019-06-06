insert into auth_user (id, auth_id) VALUES (1, 'token');
insert into auth_user (id, auth_id) VALUES (2, 'token');
select * from auth_user;

insert into recipe (id, name, created, updated, url) VALUES (1, 'recipe', now(), now(), 'url');
insert into recipe (id, name, created, updated, url) VALUES (2, 'recipe', now(), now(), 'url');
insert into recipe (id, name, created, updated, url) VALUES (3, 'recipe', now(), now(), 'url');
select * from recipe; 

insert into auth_user_recipe (user_id, recipe_id, liked, excluded, saved) VALUES (1, 1, true, false, true);
insert into auth_user_recipe (user_id, recipe_id, liked, excluded, saved) VALUES (1, 2, false, true, false);
insert into auth_user_recipe (user_id, recipe_id, liked, excluded, saved) VALUES (1, 3, true, false, true);
insert into auth_user_recipe (user_id, recipe_id, liked, excluded, saved) VALUES (2, 2, false, true, false);
insert into auth_user_recipe (user_id, recipe_id, liked, excluded, saved) VALUES (2, 3, true, false, true);

select * from recipe
where recipe.id NOT IN (
  SELECT recipe_id
  FROM auth_user_recipe
  WHERE auth_user_recipe.excluded = true 
  AND auth_user_recipe.user_id = 1
 )
 