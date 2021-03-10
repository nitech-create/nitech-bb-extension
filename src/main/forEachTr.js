export default function forEachTr(callback){
  document.body.querySelectorAll('tr+tr').forEach((tr) => {
    const idDate  = tr.querySelector('input[name="id_date"]').value;
    const idIndex = tr.querySelector('input[name="id_index"]').value;
    const selected = document.getElementById(`${idDate}+${idIndex}+select`).checked;
    const read = tr.querySelector('input[name="check_mk"]').checked;
    const highlighted = tr.querySelector('input[name="check_flag"]').checked;

    callback(read, highlighted, selected, idDate, idIndex, tr);
  });
}
