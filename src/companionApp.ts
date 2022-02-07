export default () => ({
    open: false,
    init() {
        let content = this.$el.querySelector('#secondary-app');
        let mover = this.$el.querySelector('#companion-resizer');
        const existingValue = localStorage.getItem('companionAppWidth');
        if (existingValue !== '') {
            content.style.width = existingValue;
        }
        mover.addEventListener('mousedown', (e) => {
            this.resize(content, e);
        });
    },
    toggle() {
        this.open = !this.open;
    },
    resize(element, e) {
        element.classList.add('resizing');

        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);

        let prevX = e.x;
        let initialWidth = element.getBoundingClientRect().width;

        function mousemove(e) {
            element.style.width = (initialWidth + (prevX - e.x)) + 'px';
            localStorage.setItem('companionAppWidth', element.style.width);
        }

        function mouseup() {
            element.classList.remove('resizing');
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup);
        }
    }
});
