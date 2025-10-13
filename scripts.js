<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
const API_ENDPOINT = "https://8zk6m7boz6.execute-api.us-east-1.amazonaws.com/prod"; // or prod/student if your route has one

// POST student data
document.getElementById("savestudent").onclick = function() {
  const inputData = {
    "studentid": $('#studentid').val(),
    "name": $('#name').val(),
    "class": $('#class').val(),
    "age": $('#age').val()
  };

  $.ajax({
    url: API_ENDPOINT,
    type: 'POST',
    data: JSON.stringify(inputData),
    contentType: 'application/json; charset=utf-8',
    crossDomain: true,
    success: function (response) {
      try {
        const res = JSON.parse(response);
        document.getElementById("studentSaved").innerHTML = res.message;
      } catch {
        document.getElementById("studentSaved").innerHTML = "✅ Student Data Saved!";
      }
    },
    error: function (xhr, status, error) {
      console.error("Error:", xhr.responseText);
      alert("Error saving student data. Check console for details.");
    }
  });
};

// GET all students
document.getElementById("getstudents").onclick = function() {
  $.ajax({
    url: API_ENDPOINT,
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    crossDomain: true,
    success: function (response) {
      $('#studentTable tr').slice(1).remove();
      jQuery.each(response, function(i, data) {
        $("#studentTable").append(`<tr>
          <td>${data.studentid}</td>
          <td>${data.name}</td>
          <td>${data.class}</td>
          <td>${data.age}</td>
        </tr>`);
      });
    },
    error: function (xhr, status, error) {
      console.error("Error:", xhr.responseText);
      alert("Error retrieving student data.");
    }
  });
};
</script>
