function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto py-6 px-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AI News Explorer — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
