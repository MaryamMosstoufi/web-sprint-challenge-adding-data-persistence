
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments('id');
      tbl.text('ProjectName', 128)
        .unique()
        .notNullable();
      tbl.text('ProjectDescription');
      tbl.boolean('ProjectComplete')
        .notNullable()
        .defaultTo(false);
      tbl.timestamps(true, true);
    })
    .createTable('tasks', tbl => {
      tbl.increments('id');
      tbl.text('TaskDescription')
        .notNullable();
      tbl.text('TaskNote');
      tbl.boolean('TaskComplete')
        .notNullable()
        .defaultTo(false); 
      tbl.timestamps(true, true);
      tbl.integer('projectId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('resources', tbl => {
      tbl.increments('id');
      tbl.text('ResourceName', 128)
        .notNullable();
      tbl.text('ResourceDescription');
      tbl.timestamps(true, true);
    })
    .createTable('project_resources', tbl => {
      tbl.increments('id');
      tbl.integer('projectId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.timestamps(true, true);
    })
    .createTable('task_resources', tbl => {
      tbl.increments('id');
      tbl.integer('taskId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tasks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('task_resources')
    .dropTableIfExists('project_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};
