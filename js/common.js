$(function () { 
    
    $('[data-toggle="popover"]').popover();
    $('.carousel').carousel();
});

 $('[data-spy="scroll"]').each(function () {
     var $spy = $(this).scrollspy('refresh');
        $(this).scrollspy({
    offset: 140
  });
  });
//костыль для проблемы со scrollspy
$( document ).ready(function() {
  if ($(".last").hasClass("active")) {
      $(this).removeClass("active");
	$(".first").addClass("active");

	}
});

$('a[href*=#n]').bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top-70
      }, 500);
      e.preventDefault();
   });



(function() {
  
	var app = {
		
		initialize : function () {	
			this.setUpListeners();
		},
 
		setUpListeners: function () {
			$('form#aplications').on('submit',app.submitForm);
			$('form#aplications').on('keydown', '.has-error', app.removeError);
		},
 
		submitForm: function (e) {
			e.preventDefault();
            
            var form = $(this);
                submitBtn = form.find('button[type="submit"]');
            
            
            if ( app.validateForm(form) === false) return false;
            
            var str = form.serialize();   

			// против повторного нажатия
	        submitBtn.attr({disabled: 'disabled'});

            $.ajax({
                type: "POST",
                url: "application_form/application_process.php",
                data: str                
            })
            .done(function(msg) {
                var message = $('.message');
                if(msg == 'OK') {
                    result = '<div class="text-center lead form-height">Спасибо! Ваша заявка полетела к нам. Вы будете оповещены, если пройдете конкурс.</div>';
                    form.html(result);
                } else {
                    message.html(msg);
                }		
            }).always(function(){
            	submitBtn.removeAttr("disabled");
                var windowHeight = $(window).height();
                var applycationPageHeight = $('.applycation-page').height();
                $('.form-height').css('min-height', windowHeight - applycationPageHeight-20);
                
            }) 
		},
        
        
        validateForm: function (form){

			var inputs = form.find('input.validate'),
                textareas = form.find('textarea.validate'),
                radios = form.find('input[type="radio"]'),
				valid = true;
			

			$.each(inputs, function(index, val) {
				var input = $(val),
					val = input.val(),
					formGrout = input.parents('.form-group'),
					label = formGrout.find('label').text().toLowerCase(),
					textError = 'Обязательное поле';

				if(val.length === 0){
					formGrout.addClass('has-error').removeClass('has-success');
					input.tooltip({
						trigger: 'manual',
                        container: 'html',
						placement: 'bottom',
						title: textError
					}).tooltip('show');		
					valid = false;		
				}else{
					formGrout.removeClass('has-error').addClass('has-success');
					input.tooltip('hide');
				}	
			});
            
            $.each(textareas, function(index, val) {
				var textarea = $(val),
					val = textarea.val(),
					formGrout = textarea.parents('.form-group'),
					textError = 'Максимум 2000 знаков';

				if(val.length === 0 || val.length > 2000){
					formGrout.addClass('has-error').removeClass('has-success');
					textarea.tooltip({
						trigger: 'manual',
                        container: 'html',
						placement: 'bottom',
						title: textError
					}).tooltip('show');		
					valid = false;		
				}else{
					formGrout.removeClass('has-error').addClass('has-success');
					textarea.tooltip('hide');
				}	
			});
            

			return valid;
			
		},
        

		removeError: function() {
			$(this).removeClass('has-error').find('input').tooltip('destroy');
			$(this).removeClass('has-error').find('textarea').tooltip('destroy');
		}
		
	}

	app.initialize();

}());


(function() {
  
	var app = {
		
		initialize : function () {	
			this.setUpListeners();
		},
 
		setUpListeners: function () {
			$('form#aplications_volunteer').on('submit',app.submitForm);
			$('form#aplications_volunteer').on('keydown', '.has-error', app.removeError);
		},
 
		submitForm: function (e) {
			e.preventDefault();
            
            var form = $(this);
                submitBtn = form.find('button[type="submit"]');
            
            
            if ( app.validateForm(form) === false) return false;
            
            var str = form.serialize();   

			// против повторного нажатия
	        submitBtn.attr({disabled: 'disabled'});

            $.ajax({
                type: "POST",
                url: "application-volunteer_form/application_process.php",
                data: str                
            })
            .done(function(msg) {
                var message = $('.message');
                if(msg == 'OK') {
                    result = '<div class="text-center lead form-height">Спасибо! Мы очень ценим Ваш интерес к ISWiM. Скоро Вы получите от нас ответ.</div>';
                    form.html(result);
                } else {
                    message.html(msg);
                }		
            }).always(function(){
            	submitBtn.removeAttr("disabled");
                var windowHeight = $(window).height();
                var applycationPageHeight = $('.applycation-page').height();
                $('.form-height').css('min-height', windowHeight - applycationPageHeight-20);
                
            }) 
		},
        
        
        validateForm: function (form){

			var inputs = form.find('input.validate'),
                textareas = form.find('textarea.validate'),
                radios = form.find('input[type="radio"]'),
				valid = true;
			

			$.each(inputs, function(index, val) {
				var input = $(val),
					val = input.val(),
					formGrout = input.parents('.form-group'),
					label = formGrout.find('label').text().toLowerCase(),
					textError = 'Обязательное поле';

				if(val.length === 0){
					formGrout.addClass('has-error').removeClass('has-success');
					input.tooltip({
						trigger: 'manual',
                        container: 'html',
						placement: 'bottom',
						title: textError
					}).tooltip('show');		
					valid = false;		
				}else{
					formGrout.removeClass('has-error').addClass('has-success');
					input.tooltip('hide');
				}	
			});
            
            $.each(textareas, function(index, val) {
				var textarea = $(val),
					val = textarea.val(),
					formGrout = textarea.parents('.form-group'),
					textError = 'Минимум 20 знаков';

				if(val.length < 20){
					formGrout.addClass('has-error').removeClass('has-success');
					textarea.tooltip({
						trigger: 'manual',
                        container: 'html',
						placement: 'bottom',
						title: textError
					}).tooltip('show');		
					valid = false;		
				}else{
					formGrout.removeClass('has-error').addClass('has-success');
					textarea.tooltip('hide');
				}	
			});
            

			return valid;
			
		},
        

		removeError: function() {
			$(this).removeClass('has-error').find('input').tooltip('destroy');
			$(this).removeClass('has-error').find('textarea').tooltip('destroy');
		}
		
	}

	app.initialize();

}());
$('#agree:input:checkbox').click(function(){
    if($(this).prop("checked") == true){
        $('button[type="submit"]').removeAttr('disabled');  
    }else{
        $('button[type="submit"]').attr('disabled', true);  
    }
});

(function(jQuery){var isLS=typeof window.localStorage!=="undefined";function wls(n,v){var c;if(typeof n==="string"&&typeof v==="string"){localStorage[n]=v;return true}else if(typeof n==="object"&&typeof v==="undefined"){for(c in n)if(n.hasOwnProperty(c))localStorage[c]=n[c];return true}return false}function wc(n,v){var dt,e,c;dt=new Date;dt.setTime(dt.getTime()+31536E6);e="; expires="+dt.toGMTString();if(typeof n==="string"&&typeof v==="string"){document.cookie=n+"="+v+e+"; path=/";return true}else if(typeof n===
"object"&&typeof v==="undefined"){for(c in n)if(n.hasOwnProperty(c))document.cookie=c+"="+n[c]+e+"; path=/";return true}return false}function rls(n){return localStorage[n]}function rc(n){var nn,ca,i,c;nn=n+"=";ca=document.cookie.split(";");for(i=0;i<ca.length;i++){c=ca[i];while(c.charAt(0)===" ")c=c.substring(1,c.length);if(c.indexOf(nn)===0)return c.substring(nn.length,c.length)}return null}function dls(n){return delete localStorage[n]}function dc(n){return wc(n,"",-1)}jQuery.extend({Storage:{set:isLS?
wls:wc,get:isLS?rls:rc,remove:isLS?dls:dc}})})(jQuery);
jQuery(function($){
	var text, cl;
	$(".ntSaveForms").each(function(i) {
		cl = "ntSaveForms"+i;
		$(this).addClass(cl); // add new class
		text = $.Storage.get(cl);
		if (text && text.length > 0 && !$(this).val()) {
			$(this).val(text); // set field data
		}
	});

	$(".ntSaveForms").keyup(function() {
		$.Storage.set($(this).attr("class").split(" ")[$(this).attr("class").split(" ").length -1], $(this).val()); // save field data
	});

	$(".ntSaveFormsSubmit").click(function() {
		$(".ntSaveForms").each(function(i) {
			$.Storage.remove("ntSaveForms"+i); // remove data
		});
	});
});




