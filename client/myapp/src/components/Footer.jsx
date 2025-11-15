import '../styles/components/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} StadiumReserve. All rights reserved.</p>
    </footer>
  )
}
