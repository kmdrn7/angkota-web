var cur_page,
    is_submit_true = false;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function potongDeskripsi(desk) { 
    var end = '';
    if ( desk.length > 100 ) {
        end = '...';
    }
    return desk.substr(0, desk.lastIndexOf(' ', 97)) + end;
}

function convertToRupiah(angka)
{
	var rupiah = '';
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}

function deleteButton(id){
    cur_page = DT.page();
    swal({
        title: "Hapus data ini?",
        text: "Data tidak bisa dikembalikan ketika sudah dihapus",
        icon: "warning",
        buttons: {
            cancel: "Tidak, kembali",
            ya: "Ya, hapus data"
        },
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $('#loadingModal').modal('show');
            $.ajax({
                type: "POST",
                url: "/admin/"+idh+"/delete",
                data: {
                    id: id
                },
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    $('#loadingModal').modal('hide');
                    if ( res.status == 200 ){
                        DT.page(cur_page).draw('page');
                        swal("Sukses", "Data yang anda pilih telah berhasil dihapus", {
                            icon: "success",
                        });
                    } else {                        
                        swal({
                            icon: "error",
                            title: "Error",                            
                            text: "Data yang anda pilih gagal dihapus. "+res.msg,
                        });
                    }
                }
            });
        } else {
            swal('Batal', "Data yang anda pilih tidak jadi dihapus", 'error');
        }
    });
}

// set page datatable

$(document).ready(function () {

    var drEvent = $('.dropify').dropify();
    drEvent.on('dropify.beforeClear', function(event, element){
        if ( $(element.element).parent().parent().attr('data-edit') != 'true' ) {            
            $(element.element).parent().parent().remove();
        }
    });

    $('.select2').select2({
        // placeholder: 'Pilih data'
    });

    $('#tambahGambarBarang').on('click', function(evt){
        $('#gambarContainer').append('<div class="col-md-6" style="padding: 0px"><input type="file" class="dropify" name="gambar[]" data-max-file-size="3M" data-height="200" /></div>');
        drEvent = $('.dropify').dropify();
        drEvent.on('dropify.beforeClear', function(event, element){
            $(element.element).parent().parent().remove();
        });
    });

    var dateNow = new Date();
    $('#datefrom').datetimepicker({
        format : 'DD/MM/YYYY HH:mm',
        // defaultDate : moment(dateNow).hours(0).minutes(0).seconds(0).milliseconds(0)
    });

    $('#datefrom').on('dp.change', function(e) {
        if (e.oldDate === null) {
            $(this).data('DateTimePicker').date(new Date(e.date._d.setHours(00, 00, 00)));
        }
    });
    
    $('#datefrom input').click(function(event){
        $('#datefrom').data("DateTimePicker").show();
    });

    $('#datetill').datetimepicker({
        useCurrent: false, //Important! See issue #1075
        format : 'DD/MM/YYYY HH:mm',
        // defaultDate : moment(dateNow).hours(0).minutes(0).seconds(0).milliseconds(0)
    });

    $('#datetill input').click(function(event){
        $('#datetill').data("DateTimePicker").show();
    });

    $("#datefrom").on("dp.change", function (e) {
        $('#datetill').data("DateTimePicker").minDate(e.date);
    });

    $("#datetill").on("dp.change", function (e) {
        $('#datefrom').data("DateTimePicker").maxDate(e.date);
    });

    $('.clear-tanggal').on('click', function (e) { 
        $('#datefrom input').val('');
        $('#datetill input').val('');
    });

    $('input:radio[name="is_free"]').on('change', function (e) {
        if ( this.checked && this.value == 1 ) {
            $('#htm-event').hide('300');
        } else {
            $('#htm-event').show('300');
        }
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var id;
    // DT = $('#mainDataTable').DataTable({     
    //     rowId: id_table,
    //     pageLength: 10,
    //     lengthMenu: [[5, 10, 15, 25, 50, 100 -1], [5, 10, 15, 25, 50, 100, "Semua"]],
    //     processing: true,
    //     serverSide: true,
    //     ajax: {
    //         url: idh + '/datatable',
    //         data: AjaxData,
    //     },
    //     columnDefs: columns,
    //     language: {            
    //         "emptyTable":     "Tidak ada data yang bisa ditampilkan",
    //         "info":           "Tampil _START_ s/d _END_ dari _TOTAL_ data",
    //         "infoEmpty":      "Tampil 0 s/d 0 dari 0 data",
    //         "infoFiltered":   "(difilter dari _MAX_ total data)",            
    //         "lengthMenu":     "Tampil _MENU_ data/halaman",
    //         "loadingRecords": "Sedang load data...",
    //         "processing":     "Sedang load data...",
    //         "search":         "Pencarian :",
    //         "zeroRecords":    "Pencarian tidak menemukan data",
    //         "paginate": {
    //             "first":      '<i class="fa fa-backward"></i>',
    //             "last":       '<i class="fa fa-forward"></i>',
    //             "next":       '<i class="fa fa-caret-right"></i>',
    //             "previous":   '<i class="fa fa-caret-left"></i>'
    //         },
    //         "aria": {
    //             "sortAscending":  ": urutkan data dari A-Z",
    //             "sortDescending": ": urutkan data dari Z-A"
    //         }
    //     }
    // });

    // DT.on( 'order.dt search.dt', function () {
    //     DT.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
    //         cell.innerHTML = i+1;
    //     } );
    // }).draw();

    $('.update-button').click(function (){
        alert('asdads');
    });

    $('.form-insert').on('submit', function (e){
        if ( is_submit_true ) {
            
        } else {
            e.preventDefault();
            swal({
                title: "Konfirmasi tambah data",
                text: "Apakah data yang anda masukkan sudah benar?",
                icon: "warning",
                buttons: {
                    cancel: "Tidak, kembali",
                    ya: "Ya, simpan data"
                },
                dangerMode: true,
            }).then((willSave) => {
                if (willSave) {                        
                    is_submit_true = true;                    
                    $('#btnSubmit').click();
                } else {
                    return false;
                }
            });
        }       
    });

    $('.form-update').on('submit', function (e){
        if ( is_submit_true ) {
            
        } else {
            e.preventDefault();
            swal({
                title: "Konfirmasi ubah data",
                text: "Apakah data  yang anda masukkan sudah benar?",
                icon: "warning",
                buttons: {
                    cancel: "Tidak, kembali",
                    ya: "Ya, simpan data"
                },
                dangerMode: true,
            }).then((willSave) => {
                if (willSave) {                        
                    is_submit_true = true;                    
                    $('#btnSubmit').click();
                } else {
                    return false;
                }
            });
        }       
    });

    var input_status = getParameterByName('input_status') || '';
    var update_status = getParameterByName('update_status') || '';
    if ( input_status != '' ) {
        swal('Informasi', 'Sukses menambahkan data baru', 'success');
        window.history.replaceState({}, document.title, "/admin/" + idh);
    }
    if ( update_status != '' ) {
        swal('Informasi', 'Sukses mengubah informasi data', 'success');
        window.history.replaceState({}, document.title, "/admin/" + idh);
    }

    if ( $("#"+ idh).length ){
        $('.sidenav-scroll').animate({
            scrollTop: $("#"+idh).offset().top-200
        }, 2000);
    }

    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });

    $('input').on('ifChanged', function (event) { $(event.target).trigger('change'); });
});