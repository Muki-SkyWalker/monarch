(function(Monarch, $) {
  Monarch.Remote.CreateCommand = new JS.Class('Monarch.Remote.CreateCommand', {
    include: Monarch.Util.Deferrable,

    initialize: function(record, wireRepresentation) {
      this.callSuper();
      this.record = record;
      $.ajax({
        url: Monarch.sandboxUrl + '/' + record.table.name,
        type: 'post',
        data: { field_values: wireRepresentation },
        success: this.method('triggerSuccess'),
        error: this.method('handleError')
      });
    },

    triggerSuccess: function(attributes) {
      this.record.remotelyCreated(attributes);
      this.callSuper(this.record);
    },

    triggerInvalid: function(errors) {
      this.record.errors.assign(errors);
      this.callSuper(this.record);
    },

    handleError: function(error) {
      if (error.status === 422) {
        this.triggerInvalid(JSON.parse(error.responseText));
      }
    }
  });
})(Monarch, jQuery);