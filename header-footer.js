const headerHTML = `
    <header>
        <div class="logo">Quiz Of AKTER SIR</div>
        <nav>
            <a href="https://www.facebook.com/ahr110" target="_blank">Facebook</a>
            <a href="https://wa.me/8801884197276" target="_blank">WhatsApp</a>
        </nav>
    </header>
`;

const footerHTML = `
    <footer>
        <p>Contact: <a href="mailto:aakterhossen80@gmail.com">aakterhossen80@gmail.com</a></p>
    </footer>
`;

export function loadLayout() {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}
