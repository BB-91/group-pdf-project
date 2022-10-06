import "./ProfileCard.scss";

const ProfileCard = (props) => {
    const { ShoppingCartArr, setShoppingCartArr, id, file, city, region, zipCode, country, cohortYear, firstName, lastName } = props;
    
    const getShoppingCartIndex = () => {
        let index = -1;
        for (let i=0; i<ShoppingCartArr.length; i++) {
            const profile = ShoppingCartArr[i];
            if (JSON.stringify(profile) == JSON.stringify(file)) {
                index = i;
                break;
            }
        }
        return index;
    }

    const isInShoppingCart = () => {
        return getShoppingCartIndex() >= 0;
    }

    const getCartButtonText = () => {
        const inCart = isInShoppingCart();
        const text = inCart ? "Remove from Cart" : "Add to Cart";


        return text;
    }

    const getCartClassesStr = () => {
        const classes = ['add-to-cart-button']
        if (isInShoppingCart()) {
            classes.push('in-cart');
        }

        return classes.join(' ');
    }

    const handleCartButtonClick = (event) => {
        const index = getShoppingCartIndex();
        const inCart = (index >= 0);

        if (!inCart) {
            setShoppingCartArr(ShoppingCartArr => [...ShoppingCartArr, file]);

        } else {
            if (index === -1) {
                throw new Error(`inCart: ${inCart}, but file not found in ShoppingCartArr`);
            }

            const arrCopy = [...ShoppingCartArr];
            arrCopy.splice(index, 1);
            setShoppingCartArr(arrCopy);
        }
    }

    return (
        <div className='profile-card'>
            <div className='profile-card__contents'>
                <p className='profile-card__name-row'>{firstName} {lastName}</p>
                <p className='profile-card__address-row-1'>{city}, {region}</p>
                <p className='profile-card__address-row-2'>{zipCode}, {country}</p>
                <p className='profile-card__cohort-row'>( {cohortYear} )</p>
            </div>
            <button className={getCartClassesStr()} onClick={handleCartButtonClick}>{getCartButtonText()}</button>
        </div>
    )
}

export default ProfileCard