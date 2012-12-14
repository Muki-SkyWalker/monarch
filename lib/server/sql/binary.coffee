module.exports = ({ Monarch, _ }) ->

  Monarch.Sql.Binary =
    toSql: ->
      [
        operandSql(this, @left)
        @operator,
        operandSql(this, @right)
      ].join(' ')

  operandSql = (node, operand) ->
    if node.operandNeedsParens?(operand)
      ["(", operand.toSql(), ")"].join(' ')
    else
      operand.toSql()
