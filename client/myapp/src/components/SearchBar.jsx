import '../styles/components/SearchBar.css'

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search stadiums, city...' }) {
  return (
    <form className="searchbar" onSubmit={(e)=>{e.preventDefault(); onSubmit?.()}}>
      <input
        className="searchbar__input"
        type="text"
        value={value}
        onChange={(e)=>onChange?.(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit" className="searchbar__btn">Search</button>
    </form>
  )
}
