import $ from 'jquery';
import { AJAX } from '../modules/ajax.ts';
import { escapeHtml } from '../modules/functions/escape.ts';

/**
 * @fileoverview    Javascript functions used in server user groups page
 * @name            Server User Groups
 *
 * @requires    jQuery
 */

/**
 * Unbind all event handlers before tearing down a page
 */
AJAX.registerTeardown('server/user_groups.js', function () {
    $('#deleteUserGroupModal').off('show.bs.modal');
});

/**
 * Bind event handlers
 */
AJAX.registerOnload('server/user_groups.js', function () {
    const deleteUserGroupModal = $('#deleteUserGroupModal');
    deleteUserGroupModal.on('show.bs.modal', function (event) {
        // @ts-ignore
        const userGroupName = $(event.relatedTarget).data('user-group');
        (this.querySelector('.modal-body') as HTMLDivElement).innerText = window.sprintf(
            window.Messages.strDropUserGroupWarning,
            escapeHtml(userGroupName)
        );
    });

    deleteUserGroupModal.on('shown.bs.modal', function (event) {
        // @ts-ignore
        const userGroupName = $(event.relatedTarget).data('user-group');
        $('#deleteUserGroupConfirm').on('click', function () {
            $.post(
                'index.php?route=/server/user-groups',
                {
                    'deleteUserGroup': true,
                    'userGroup': userGroupName,
                    'ajax_request': true,
                },
                AJAX.responseHandler
            );

            $('#deleteUserGroupModal').modal('hide');
        });
    });
});
