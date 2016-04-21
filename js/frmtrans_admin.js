function frmTransAdminJS(){

	function toggleSub(){
		var val = this.value;
		var show = (val == 'recurring');
		toggleOpts(this, show, '.frm_trans_sub_opts');
	}

	function toggleOpts(opt, show, c){
		var opts = jQuery(opt).closest('.frm_form_action_settings').find(c);
		if(show){
			opts.slideDown('fast');
		}else{
			opts.slideUp('fast');
		}
	}

	function addAfterPayRow(){
		var id = jQuery(this).data('emailkey');
		var rowNum = 0;
		var form_id = document.getElementById('form_id').value;
		if(jQuery('#frm_form_action_'+id+' .frmtrans_after_pay_row').length){
			rowNum = 1 + parseInt(jQuery('#frm_form_action_'+id+' .frmtrans_after_pay_row:last').attr('id').replace('frmtrans_after_pay_row_'+id+'_', ''));	
		}
		jQuery.ajax({
			type:'POST',url:ajaxurl,
			data:{action:'frmtrans_after_pay', email_id:id, form_id:form_id, row_num:rowNum, nonce:frmGlobal.nonce},
			success:function(html){
				var addButton = jQuery(document.getElementById('frmtrans_after_pay_'+id));
				addButton.fadeOut('slow', function(){
					var $logicRow = addButton.next('.frmtrans_after_pay_rows');
					$logicRow.find('tbody').append(html);
					$logicRow.fadeIn('slow');
				});
			}
		});
		return false;
	}

	function runAjaxLink( e ) {
		e.preventDefault();

		var $link = jQuery(this);
		var confirmText = $link.data('deleteconfirm');
		if ( confirm( confirmText ) ) {
			var href = $link.attr('href');
			var id = $link.data('tempid');

			$link.replaceWith('<span class="frm-loading-img" id="'+ id +'"></span>');
			jQuery.ajax({
				type:'GET', url:href,
				data:{nonce:frm_trans_vars.nonce},
				success:function(html){
					jQuery('#'+id).replaceWith(html);
				}
			});
		}

		return false;
	}

	return{
		init: function(){
			var actions = document.getElementById('frm_notification_settings');
			if ( actions !== null ) {
				jQuery(actions).on('change', '.frm_trans_type', toggleSub);
				jQuery('.frm_form_settings').on('click', '.frm_add_trans_logic', addAfterPayRow);
			}

			jQuery('.frm_trans_ajax_link').click( runAjaxLink );
		}
	};
}

var frmTransAdmin = frmTransAdminJS();

jQuery(document).ready(function($){
	frmTransAdmin.init();
});