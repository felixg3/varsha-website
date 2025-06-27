document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('darkToggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});
