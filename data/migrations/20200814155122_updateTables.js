
exports.up = function(knex) {
  return knex.schema
    .table('project_resources', tbl => {
      tbl.integer('resourceId')
        .unsigned()
        .references('id')
        .inTable('resources')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .table('task_resources', tbl => {
      tbl.integer('resourceId')
        .unsigned()
        .references('id')
        .inTable('resources')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('task_resources').dropColumn('resourceId')
    .table('project_resources').dropColumn('resourceId');
};
